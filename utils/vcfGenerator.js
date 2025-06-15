export default function generateVcf(data) {
  const {
    name = '',
    title = '',
    company = '',
    phone = '',
    email = '',
    link = '',
  } = data || {};

  const parts = name.trim().split(' ');
  const firstName = parts.shift() || '';
  const lastName = parts.join(' ');

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${name}`,
    company && `ORG:${company}`,
    title && `TITLE:${title}`,
    phone && `TEL;TYPE=CELL:${phone}`,
    email && `EMAIL:${email}`,
    link && `URL:${link}`,
    'END:VCARD',
  ].filter(Boolean);

  return lines.join('\n');
}
