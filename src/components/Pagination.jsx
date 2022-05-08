import React from 'react'

export const Pagination = () => {
  return (
    <div>
        <div className="pagination">
            <button className="pagination__button">Предыдущая</button>
            <ul>
                <li className="pagination__item"> </li>
            </ul>
            <button className="pagination__button">Следующая</button>
        </div>
    </div>
  )
}
