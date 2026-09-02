/**
 * Renders a JSON-LD block.
 *
 * `JSON.stringify` output is not HTML, so the only sequence that could escape
 * the script element is a literal `<`; it is replaced with its unicode escape,
 * which JSON parsers read back identically.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
