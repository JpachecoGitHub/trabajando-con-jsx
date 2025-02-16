import Button from "../Button";
import './CardPizza.css';

const Cardpizza = ({ imagen, name, price, ingredients }) => {
  const ingredientes = ingredients.sort().join(",");

  return (
    <div className="card-container"> 
      <div className="card" style={{ width: "25rem" }}>
        <img src={imagen} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <hr />
          <ul className="list-group list-group-flush">
            <h6> Ingredientes: </h6>
            <li className="list-group-item">{ ingredientes }</li>
          </ul>
          <hr />
          <p className="card-text">Precio: ${price}</p>
          <div className="card-body" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            text="Ver Más"
            className="btn btn-primary"
            onClick={() => console.log("Ver Más")}
          />
          <Button
            text="Añadir"
            className="btn btn-secondary"
            onClick={() => console.log("Añadir")}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cardpizza;
