export const linkCSS = (cssRoute) =>{
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssRoute;
    document.head.appendChild(link);
}