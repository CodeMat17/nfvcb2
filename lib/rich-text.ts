// Article bodies come from the dashboard's rich-text editor as HTML
// (e.g. "<p>One</p><p></p><p>Two</p>"). Older entries may be plain text.

const HTML_TAG = /<\/?[a-z][\s\S]*?>/i;

export function isHtml(value: string) {
  return HTML_TAG.test(value);
}

// Light-touch cleanup: the HTML is authored in our own CMS, so this only
// strips executable content and the blank paragraphs the editor emits.
export function cleanArticleHtml(html: string) {
  return (
    html
      .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
      .replace(/<(script|style|iframe|object|embed)[^>]*\/?>/gi, "")
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '$1="#"')
      // Empty paragraphs: <p></p>, <p> </p>, <p>&nbsp;</p>, <p><br></p>, etc.
      .replace(/<p[^>]*>(?:\s|&nbsp;|&#160;|<br\s*\/?>)*<\/p>/gi, "")
      .trim()
  );
}

export function textParagraphs(text: string) {
  return text.split(/\n{2,}/).filter((p) => p.trim().length > 0);
}
