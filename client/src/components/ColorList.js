import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {useHistory} from 'react-router-dom'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const {go, push} = useHistory()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    e.preventDefault();
    const body = {...colorToEdit}
    const {id} = colorToEdit
    axiosWithAuth()
    .put(`/api/colors/${id}`, body)
    .then(res => console.log(res))
    .catch(error => console.log('YIKES!!!', error))

    colorsUpdate();
   
    setEditing();
  };
  const colorsUpdate = () => {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      updateColors(res.data)
    })
    .catch(error => console.log('YIKES', error))
  }
  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`, color)
    .then(res => console.log('You have just deleted: ', res))
    .catch(error => console.log('Snap, Crackle, POP!!! You could not delete it!', error ))
    go(0)
    
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
