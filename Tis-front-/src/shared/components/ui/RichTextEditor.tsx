import { useEffect, useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Escribe una descripción...",
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const updateValue = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateValue();
    editorRef.current?.focus();
  };

  return (
    <div className="border border-slate-700 rounded bg-slate-800 mb-3">
      <div className="flex flex-wrap gap-2 p-2 border-b border-slate-700">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded font-bold"
        >
          B
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded italic"
        >
          I
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("underline")}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded underline"
        >
          U
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("fontSize", "3")}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded"
        >
          Normal
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("fontSize", "5")}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded"
        >
          Grande
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertUnorderedList")}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded"
        >
          Lista
        </button>
      </div>

      <div
  ref={editorRef}
  contentEditable
  onInput={updateValue}
  data-placeholder={placeholder}
  className="
    min-h-[120px] p-3 text-white outline-none max-w-none
    [&_ul]:list-disc [&_ul]:pl-6
    [&_ol]:list-decimal [&_ol]:pl-6
    [&_li]:ml-4
  "
  style={{ whiteSpace: "pre-wrap" }}
/>  
    </div>
  );
};