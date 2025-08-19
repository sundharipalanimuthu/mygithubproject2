import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import * as runtime from "react/jsx-runtime";

import Image from "next/image";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

type ComponentsProps = HTMLAttributes<HTMLElement>;

const components = {
  h1: ({ className, ...props }: ComponentsProps) => (
    <h1
      className={cn(
        "mt-4 mb-6 scroll-m-20  md:text-6xl font-extrabold font-sans tracking-tight leading-tight ",
        className
      )}
      {...props}
    />
  ),

  h2: ({ className, ...props }: ComponentsProps) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold text-primary tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentsProps) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold text-primary tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentsProps) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold text-primary tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ComponentsProps) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold text-primary tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ComponentsProps) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold text-primary tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentsProps) => (
    <a
      className={cn(
        "font-medium underline text-primary underline-offset-4",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentsProps) => (
    <p
      className={cn(
        "leading-7 text-[18px] [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentsProps) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentsProps) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentsProps) => (
    <li className={cn("mt-2 text-[18px]", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentsProps) => (
    <blockquote
      className={cn(
        "[&>*]:text-muted-foreground mt-6 border-l-3 border-purple-400 bg-purple-100 pl-6 italic",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
      <table
        className={cn(
          "w-full table-auto border-collapse text-sm text-gray-800 dark:text-gray-100",
          className
        )}
        {...props}
      />
    </div>
  ),

  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("border-t border-gray-300 dark:border-gray-700", className)}
      {...props}
    />
  ),

  th: ({ className, ...props }: ComponentsProps) => (
    <th
      className={cn(
        " text-[16px] bg-gray-100 dark:bg-gray-900 px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200",
        "[&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),

  td: ({ className, ...props }: ComponentsProps) => (
    <td
      className={cn(
        "px-4 text-[16px] py-3 text-left text-gray-700 dark:text-gray-100",
        "border-t border-gray-300 dark:border-gray-700",
        "[&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentsProps) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto text-sm rounded-lg border border-[#2a2a3d] bg-[#1a1b26] py-4 px-4",
        className
      )}
      {...props}
    />
  ),

  Image,
};

interface MdxProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ Image, ...components }} />;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div>
      <Component components={components} />
    </div>
  );
}
