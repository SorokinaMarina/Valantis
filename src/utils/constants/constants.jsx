export const pageElementsCount = [20, 30, 40, 50];

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

  if (window.innerWidth > 450) {
    return 3;
  }

  return 1;
}
