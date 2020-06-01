//Learned from source https://github.com/karlhadwen/react-dropdown-menu/blob/master/src/Dropdown.js
import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';

function Dropdown({lists}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  return (
    <div>
       <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>            
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>

      {lists.map((s,index) => (
            <h7> 
             {s.value}
            </h7>
          ))}
    </div>
      
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);