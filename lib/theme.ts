export function setTheme(mode: "light" | "dark") {
  const root = document.documentElement;

  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  localStorage.setItem("theme", mode);
}

export function getTheme(): "light" | "dark" {
  return (localStorage.getItem("theme") as "light" | "dark") || "light";
}
