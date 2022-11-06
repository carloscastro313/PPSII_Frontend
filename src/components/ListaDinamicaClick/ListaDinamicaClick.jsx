import React, { useState, useEffect } from "react";

const ListaDinamicaClick = ({
  listado = [],
  onClickEvent,
  cssClass = "w-full",
  cssClassHeader = "bg-blue-500 text-white",
  skip = [],
  headerEnable = true,
}) => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    setLista(listado);
  }, [listado]);

  return (
    <table className={cssClass + " text-center"}>
      {headerEnable && (
        <thead className={cssClassHeader}>
          <ListaHeader names={[...Object.keys(listado[0])]} skip={skip} />
        </thead>
      )}

      <tbody>
        {lista.map((value, index) => (
          <ListaItem
            value={value}
            key={index}
            action={onClickEvent}
            skip={skip}
          />
        ))}
      </tbody>
    </table>
  );
};

const ListaHeader = ({ names = [], skip = [] }) => (
  <tr>
    {names.map((name) => {
      if (!skip.includes(name))
        return (
          <th key={name} className="p-2">
            {name}
          </th>
        );
      else return null;
    })}
  </tr>
);

const ListaItem = ({ value, action, skip = [] }) => {
  return (
    <tr
      onClick={() => action(value)}
      className="hover:cursor-pointer hover:bg-gray-300"
    >
      {Object.keys(value).map((key, index) => {
        if (!skip.includes(key))
          return (
            <td key={key + value.id + index} className="py-2">
              {value[key]}
            </td>
          );
        else return null;
      })}
    </tr>
  );
};

export default ListaDinamicaClick;
