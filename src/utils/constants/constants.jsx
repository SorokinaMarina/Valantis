export function setCountProducts() {
  if (window.innerWidth >= 1280) {
    return 50;
  }
  if (window.innerWidth < 1280 && window.innerWidth >= 700) {
    return 48;
  }
  return 20;
}

export function countPaginatePages() {
  if (window.innerWidth > 600) {
    return 5;
  }

  return 3;
}
