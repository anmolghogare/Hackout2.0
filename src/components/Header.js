export function Header({ title = '', subtitle = '' } = {}) {
  return `
    <header class="header">
      <h1>${title}</h1>
      ${subtitle ? `<p>${subtitle}</p>` : ''}
    </header>
  `;
}
