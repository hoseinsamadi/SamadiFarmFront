import NextLink, { type LinkProps } from "next/link";
import { useRouter } from "next/router";
import type { ReactNode, AnchorHTMLAttributes } from "react";

export function HashRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Route({ element }: { path: string; element: ReactNode }) {
  return <>{element}</>;
}

type RouterLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<LinkProps, "href"> & { to: string; children: ReactNode };

export function Link({ to, children, ...props }: RouterLinkProps) {
  return <NextLink href={to} {...props}>{children}</NextLink>;
}

type RouterNavLinkProps = RouterLinkProps & {
  className?: string | ((args: { isActive: boolean }) => string);
  end?: boolean;
};

export function NavLink({ to, children, className, end, ...props }: RouterNavLinkProps) {
  const router = useRouter();
  const current = router.asPath.split("?")[0].replace(/\/$/, "") || "/";
  const target = to.replace(/\/$/, "") || "/";
  const isActive = end ? current === target : current === target || current.startsWith(`${target}/`);
  const resolvedClass = typeof className === "function" ? className({ isActive }) : className;
  return <NextLink href={to} className={resolvedClass} {...props}>{children}</NextLink>;
}

export function useLocation() {
  const router = useRouter();
  return { pathname: router.pathname };
}

export function useNavigate() {
  const router = useRouter();
  return (to: string) => router.push(to);
}

export function useSearchParams() {
  const router = useRouter();
  const params = new URLSearchParams(router.asPath.split("?")[1] || "");
  const setParams = (next: Record<string, string>, options?: { replace?: boolean }) => {
    const query = new URLSearchParams(next).toString();
    const url = query ? `${router.pathname}?${query}` : router.pathname;
    return options?.replace ? router.replace(url) : router.push(url);
  };
  return [params, setParams] as const;
}
