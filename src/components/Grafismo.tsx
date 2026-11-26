/**
 * Faixa geométrica inspirada nos grafismos da cerâmica marajoara
 * (espirais escalonadas), usada uma única vez, no rodapé.
 */
export default function Grafismo({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="100%" height="28">
      <defs>
        <pattern id="marajoara" width="44" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M0 22 H8 V6 H28 V17 H16 V11 H22 M32 22 H44 M36 6 H44 M36 6 V14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </pattern>
      </defs>
      <rect width="100%" height="28" fill="url(#marajoara)" />
    </svg>
  );
}
