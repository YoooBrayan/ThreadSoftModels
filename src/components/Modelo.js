import React from 'react'

export default function Modelo(props){
    
    return(
        <div className="card m-1">
            <img src={props.name==='Nuevo'?'https://www.pinclipart.com/picdir/big/335-3351291_blouse-coloring-page-imagenes-de-blusa-para-dibujar.png':'https://svgsilh.com/svg/39388.svg'} className="card-image-top mt-3" style={{width: 100, margin: 'auto'}} alt=""/>
            <div className="card-body text-center">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.valor}</p>
                <a className={props.name=='Nuevo'?'btn btn-success':'btn btn-primary'}>Operaciones</a>
            </div>

        </div>
    );
}