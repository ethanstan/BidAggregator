export const toggleTheme = () => {
  const theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";

  if (theme == "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else if (theme == "light") {
    document.documentElement.setAttribute("data-theme", "sepia");
    localStorage.setItem("theme", "sepia");
  } else if (theme == "sepia") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}
