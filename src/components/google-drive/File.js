import { faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { database, storage } from "../../firebase";
import { BsPencilSquare } from "react-icons/bs"

export default function File({ file }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState(file.name);

  async function handleDelete() {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${file.name}?`
    );

    if (shouldDelete) {
      try {
        // Delete from database
        await database.files.doc(file.id).delete();

        // Delete from Firebase storage
        await storage.refFromURL(file.url).delete();
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  }

  async function handleRename() {
    try {
      // Update file name in the database
      await database.files.doc(file.id).update({
        name: newFileName,
      });
    } catch (error) {
      console.error("Error renaming file:", error);
    } finally {
      setIsRenaming(false);
    }
  }

  return (
    <div className="d-flex align-items-center">
      {isRenaming ? (
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          onBlur={handleRename}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleRename();
            }
          }}
          autoFocus
        />
      ) : (
        <>
          <a
            href={file.url}
            target="_blank"
            className="btn btn-outline-dark text-truncate flex-grow-1 mr-2"
          >
            <FontAwesomeIcon icon={faFile} className="mr-2" />
            {file.name}
          </a>
          <button
            className="btn btn-sm btn-danger mr-2"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setIsRenaming(true)}
          >
            <BsPencilSquare />
          </button>
        </>
      )}
    </div>
  );
}
