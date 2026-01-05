/**
 * @bookmarklet Target spacing check
 * @description Identify controls with spacing or size issues
 * @author Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags accessibility, wcag:2.5.8
 * @auditing true
 * @pageTest self
 */
(function () {
  "use strict";

  const existing = document.getElementById("wcag-target-size-overlay");
  if (existing) {
    existing.remove();
    return;
  }

  const MIN_SIZE = 24;
  const CIRCLE_RADIUS = 12;

  const interactiveSelectors = [
    "a[href]",
    "button",
    'input:not([type="hidden"])',
    "select",
    "textarea",
    "summary",
    '[role="button"]',
    '[role="link"]',
    '[role="menuitem"]',
    '[role="menuitemcheckbox"]',
    '[role="menuitemradio"]',
    '[role="tab"]',
    "[onclick]",
    '[tabindex]:not([tabindex="-1"])',
  ];

  const elements = Array.from(
    document.querySelectorAll(interactiveSelectors.join(","))
  );

  const visibleElements = elements.filter((el) => {
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      rect.width > 0 &&
      rect.height > 0
    );
  });

  function isInlineTarget(el) {
    const style = window.getComputedStyle(el);
    const display = style.display;
    if (!display.includes("inline")) return false;
    const parent = el.parentElement;
    if (!parent) return false;
    const parentText = parent.textContent.trim();
    const elText = el.textContent.trim();
    return parentText.length > elText.length + 10;
  }

  function meetsMinimumSize(rect) {
    return rect.width >= MIN_SIZE && rect.height >= MIN_SIZE;
  }

  function getCenter(rect) {
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  function circlesIntersect(center1, center2) {
    const dx = center1.x - center2.x;
    const dy = center1.y - center2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < MIN_SIZE;
  }

  function circleIntersectsRect(center, rect) {
    const closestX = Math.max(rect.left, Math.min(center.x, rect.right));
    const closestY = Math.max(rect.top, Math.min(center.y, rect.bottom));
    const dx = center.x - closestX;
    const dy = center.y - closestY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < CIRCLE_RADIUS;
  }

  const results = visibleElements.map((el, index) => {
    const rect = el.getBoundingClientRect();
    const isInline = isInlineTarget(el);
    const meetsSize = meetsMinimumSize(rect);
    return {
      element: el,
      rect: rect,
      index: index,
      isInline: isInline,
      meetsSize: meetsSize,
      center: getCenter(rect),
      violation: null,
      reason: null,
    };
  });

  results.forEach((target) => {
    if (target.meetsSize || target.isInline) {
      return;
    }
    const hasViolation = results.some((other) => {
      if (other === target) return false;
      if (circleIntersectsRect(target.center, other.rect)) {
        target.violation = "spacing";
        target.reason = "Undersized target with insufficient spacing";
        return true;
      }
      if (!other.meetsSize && !other.isInline) {
        if (circlesIntersect(target.center, other.center)) {
          target.violation = "spacing";
          target.reason = "Undersized target circles intersect";
          return true;
        }
      }
      return false;
    });
    if (!hasViolation) {
      target.violation = null;
    }
  });

  results.forEach((target) => {
    if (!target.meetsSize && !target.isInline && !target.violation) {
      return;
    }
    if (
      !target.meetsSize &&
      !target.isInline &&
      target.violation === "spacing"
    ) {
      return;
    }
    if (!target.meetsSize && !target.isInline && !target.violation) {
      target.violation = null;
    }
  });

  const violations = results.filter((r) => r.violation);
  const warnings = results.filter(
    (r) => !r.meetsSize && !r.isInline && !r.violation
  );
  const passes = results.filter((r) => r.meetsSize || r.isInline);

  const overlay = document.createElement("div");
  overlay.id = "wcag-target-size-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border: 2px solid #333;
    border-radius: 8px;
    padding: 0;
    max-width: 400px;
    z-index: 999999;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;

  const headerHTML = `
    <div id="wcag-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; cursor: move; background: #f5f5f5; border-radius: 6px 6px 0 0; border-bottom: 1px solid #ddd;">
      <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Target spacing</h3>
      <div style="display: flex; gap: 8px;">
        <button id="wcag-minimize" style="background: none; border: none; font-size: 18px; cursor: pointer; padding: 0; line-height: 1; width: 24px; height: 24px;" aria-label="Minimize">&#8211;</button>
        <button id="wcag-close" style="background: none; border: none; font-size: 24px; cursor: pointer; padding: 0; line-height: 1; width: 24px; height: 24px;" aria-label="Close">&times;</button>
      </div>
    </div>
  `;

  const contentHTML = `
    <div id="wcag-content" style="padding: 15px;">
      <div style="margin-bottom: 15px;">
        <div style="margin-bottom: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; background: #dc3545; border-radius: 50%; margin-right: 8px;"></span>
          <strong>${violations.length}</strong> Violations
        </div>
        <div style="margin-bottom: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; background: #ffc107; border-radius: 50%; margin-right: 8px;"></span>
          <strong>${warnings.length}</strong> Undersized (but sufficient spacing)
        </div>
        <div style="margin-bottom: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; background: #28a745; border-radius: 50%; margin-right: 8px;"></span>
          <strong>${passes.length}</strong> Pass
        </div>
      </div>
      <div style="font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px;">
        Targets highlighted on page. Violations do not meet WCAG 2.5.8 Level AA, programmatically. Manual review is advised.
      </div>
    </div>
  `;

  overlay.innerHTML = headerHTML + contentHTML;

  document.body.appendChild(overlay);

  const header = document.getElementById("wcag-header");
  const content = document.getElementById("wcag-content");
  const minimizeBtn = document.getElementById("wcag-minimize");
  let isMinimized = false;

  minimizeBtn.addEventListener("click", () => {
    isMinimized = !isMinimized;
    content.style.display = isMinimized ? "none" : "block";
    minimizeBtn.innerHTML = isMinimized ? "+" : "&#8211;";
    minimizeBtn.setAttribute("aria-label", isMinimized ? "Expand" : "Minimize");
  });

  document.getElementById("wcag-close").addEventListener("click", () => {
    overlay.remove();
    document.querySelectorAll(".wcag-highlight").forEach((el) => el.remove());
  });

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  header.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "BUTTON") return;
    isDragging = true;
    const rect = overlay.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    overlay.style.right = "auto";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    overlay.style.left = e.clientX - dragOffsetX + "px";
    overlay.style.top = e.clientY - dragOffsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  results.forEach((target) => {
    const highlight = document.createElement("div");
    highlight.className = "wcag-highlight";
    highlight.style.cssText = `
      position: absolute;
      left: ${target.rect.left + window.scrollX}px;
      top: ${target.rect.top + window.scrollY}px;
      width: ${target.rect.width}px;
      height: ${target.rect.height}px;
      pointer-events: none;
      z-index: 999998;
      box-sizing: border-box;
    `;

    if (target.violation) {
      highlight.style.outline = "2px solid #dc3545";
      highlight.style.backgroundColor = "rgba(220, 53, 69, 0.2)";
      if (!target.meetsSize) {
        const circle = document.createElement("div");
        circle.style.cssText = `
          position: absolute;
          left: ${target.rect.width / 2 - CIRCLE_RADIUS}px;
          top: ${target.rect.height / 2 - CIRCLE_RADIUS}px;
          width: ${MIN_SIZE}px;
          height: ${MIN_SIZE}px;
          outline: 4px solid #dc3545;
          outline-offset: -4px;
          border-radius: 50%;
          pointer-events: none;
        `;
        highlight.appendChild(circle);
      }
    } else if (!target.meetsSize && !target.isInline) {
      highlight.style.outline = "2px solid #ffc107";
      highlight.style.backgroundColor = "rgba(255, 193, 7, 0.2)";
      const circle = document.createElement("div");
      circle.style.cssText = `
        position: absolute;
        left: ${target.rect.width / 2 - CIRCLE_RADIUS}px;
        top: ${target.rect.height / 2 - CIRCLE_RADIUS}px;
        width: ${MIN_SIZE}px;
        height: ${MIN_SIZE}px;
        outline: 4px solid #ffc107;
        outline-offset: -4px;
        border-radius: 50%;
        pointer-events: none;
      `;
      highlight.appendChild(circle);
    } else {
      highlight.style.outline = "1px solid #28a745";
      highlight.style.backgroundColor = "rgba(40, 167, 69, 0.1)";
    }

    document.body.appendChild(highlight);
  });

  console.log("Target spacing analysis:", {
    total: results.length,
    violations: violations.length,
    warnings: warnings.length,
    passes: passes.length,
  });
})();
