const filters = document.querySelector('[data-career-filters]');
if (filters) {
  const buttons = [...filters.querySelectorAll('[data-career-filter]')];
  const roles = [...document.querySelectorAll('[data-career-role]')];
  const count = document.querySelector('[data-career-count]');
  filters.hidden = false;
  for (const button of buttons) button.addEventListener('click', () => {
    const selected = button.dataset.careerFilter;
    for (const other of buttons) other.setAttribute('aria-pressed', String(other === button));
    let visible = 0;
    for (const role of roles) {
      role.hidden = selected !== 'all' && role.dataset.category !== selected;
      if (!role.hidden) visible++;
    }
    if (count) count.textContent = `${visible} ${visible === 1 ? 'opportunity' : 'opportunities'}`;
  });
}
for (const button of document.querySelectorAll('[data-job-print]')) {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
}
