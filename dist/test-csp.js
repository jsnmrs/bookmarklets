javascript:void%20(()=%3E%7Bdocument.addEventListener(%22securitypolicyviolation%22,o,!1);function%20o(e)%7B%22use%20strict%22;alert(e.blockedURI),alert(e.violatedDirective),alert(e.originalPolicy)%7Dvar%20t=document.createElement(%22style%22),n=document.createTextNode('body::after%7B%20position:%20absolute;%20top:%200;%20right:%204px;%20background-color:%20#000;%20color:%20#01ff70;%20z-index:%209999;%20font-size:%2016px;%20font-weight:%20400;%20padding:%203px%209px;%20outline:%204px%20solid%20#01ff70%20!important;%20content:%20%22checking%20for%20CSP%22;%7D%7D'),i=document.getElementsByTagName(%22head%22);t.appendChild(n);i%5B0%5D.appendChild(t);%7D)();%0A