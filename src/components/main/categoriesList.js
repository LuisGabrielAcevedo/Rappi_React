import React, { Component } from 'react';
import ProductsListComponent from './productList';

class CatogoriesListComponent extends Component {
  render() {
    return (
      <div>
        {
          this.props.categories.map((category, i) => (
            <div key={i} className="level-1">
              <span className="level-label" style={{color: '#3f51b5'}}>{category.name}</span>
              {
                category.sublevels.map((firstLevel, j) => (
                  <div key={j} className="level-2">
                    <span className="level-label">{firstLevel.name}</span>
                    <span>({firstLevel.products ? firstLevel.products.length : '0'})</span>
                    {firstLevel.products ? <ProductsListComponent sortBy={this.props.sortBy} products={firstLevel.products} /> : null}
                    {
                      firstLevel.sublevels ? firstLevel.sublevels.map((secondLevel, k) => (
                        <div className="level-3" key={k}>
                          <span className="level-label">{secondLevel.name}</span>
                          <span>({secondLevel.products ? secondLevel.products.length : '0'})</span>
                          {secondLevel.products ? <ProductsListComponent sortBy={this.props.sortBy} products={secondLevel.products} /> : null}
                          {
                            secondLevel.sublevels ? firstLevel.sublevels.map((lastLevel, z) => (
                              <div className="level-4" key={z}>
                                <span className="level-label">{lastLevel.name}</span>
                                <span>({lastLevel.products ? lastLevel.products.length : '0'})</span>
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