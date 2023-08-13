import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { database, storage } from "../../firebase";
import { faFolder, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Folder({ folder, onDeleteFolder, onRenameFolder }) {

  async function handleDeleteFolder()  {
    // Call the onDeleteFolder function with the folder ID as an argument
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${folder.name}?`
    );

    if (shouldDelete) {
      try {
        // Delete from database
        await database.folders.doc(folder.id).delete();

        // Delete from Firebase storage
        await storage.refFromURL(folder.url).delete();
      } catch (error) {
        console.error("Error deleting folder:", error);
      }
    }
  };

  async function handleRenameFolder() {
    // Get the new folder name from the user using a prompt
    const newFolderName = prompt("Enter the new folder name:", folder.name);
  
    // Ensure the user provided a valid name and proceed with renaming
    if (newFolderName && newFolderName.trim() !== "") {
      try {
        // Update the folder name in the database
        await database.folders.doc(folder.id).update({
          name: newFolderName,
        });
  
        // Call the onRenameFolder function with the folder ID and new folder name as arguments
        onRenameFolder(folder.id, newFolderName);
      } catch (error) {
        console.error("Error renaming folder:", error);
      }
    }
  }
  

  return (
    <div className="d-flex align-items-center">
      <Button
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}
        variant="outline-dark"
        className="text-truncate flex-grow-1 mr-2"
        as={Link}
      >
        <FontAwesomeIcon icon={faFolder} className="mr-2" />
        {folder.name}
      </Button>
      <DropdownButton variant="light" title="Options" size="sm" alignRight>
        <Dropdown.Item onClick={handleDeleteFolder}>
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRenameFolder}>
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Rename
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

// background: rgb(2,0,36);
// background: linear-gradient(90deg, rgba(2,0,36,1) 21%, rgb(167 0 0) 100%);  about world
// }

//     background: rgb(2,0,36);
// background: linear-gradient(90deg, rgba(2,0,36,1) 21%, rgb(255 0 127) 100%); your own
