import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {


    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-danger text-center display-1">404 - Not Found</h1>
                </div>
                <div className="col-12">
                    <Link className="btn btn-success w-50 mx-auto d-block mt-5" to="/">Home</Link>

                </div>
            </div>
        </div>
    )

}