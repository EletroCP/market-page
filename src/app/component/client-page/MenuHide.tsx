export const MenuHide = ({ itens }: { itens: string[] }) => {
  return (
    <div className="w-64 h-auto bg-white absolute top-10 -right-40">
      <hr className="border-orange-500 border" />
      <p className="text-black font-thin pt-3 pl-5 hover:bg-slate-100">Todos</p>
      {itens.map((item, index) => (
        <div key={`${item}-${index}`}>
          <p
            className={`text-black font-thin pt-3 pl-5 hover:bg-slate-100 ${index === itens.length - 1 ? 'pb-3' : ''}`}
          >
            {item}
          </p>
        </div>
      ))}
    </div>
  );
};
