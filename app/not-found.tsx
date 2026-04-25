import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/5 p-6 text-center">
      <h1 className="text-2xl font-bold">Pagina nao encontrada</h1>
      <p className="mt-2 text-[var(--muted)]">Essa orbita ainda nao foi mapeada.</p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-xl border border-white/30 bg-white/10 px-4 py-2"
      >
        Voltar para o dashboard
      </Link>
    </div>
  );
}
