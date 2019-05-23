import React, { Component } from 'react';
import ProductsListComponent from './productList';

class CatogoriesListComponent extends Component {
  render() {
    return (
      <div>
        {
          this.props.categories.map((category, i) => (
            <div key={i} className="level-1">
              <span className="level-label">{category.name}</span>
              {
                category.sublevels.map((firstLevel, j) => (
                  <div key={j} className="level-2">
                    <span className="level-label">{firstLevel.name}</span>
                    {firstLevel.products ? <ProductsListComponent sortBy={this.props.sortBy} products={firstLevel.products} /> : null}
                    {
                      firstLevel.sublevels ? firstLevel.sublevels.map((secondLevel, k) => (
                        <div className="level-3" key={k}>
                          <span className="level-label">{secondLevel.name}</span>
                          {secondLevel.products ? <ProductsListComponent sortBy={this.props.sortBy} products={secondLevel.products} /> : null}
                          {
                            secondLevel.sublevels ? firstLevel.sublevels.map((lastLevel, z) => (
                              <div className="level-4" key={z}>
                                <span className="level-label">{lastLevel.name}</span>
                                {lastLevel.products ? <ProductsListComponent sortBy={this.props.sortBy} products={lastLevel.products} /> : null}
                              </div>
                            )) : null
                          }
                        </div>
                      )) : null
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default CatogoriesListComponent;