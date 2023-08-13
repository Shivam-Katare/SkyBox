import React, { useState, useEffect } from "react"
import { Breadcrumb } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function FolderBreadcrumbs({ currentFolder }) {
  const [loading, setLoading] = useState(false);

  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  if (currentFolder) path = [...path, ...currentFolder.path]

  useEffect(() => {
    // Simulate loading time here, replace with actual logic for fetching files/folders
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Replace 1000 with actual loading time in milliseconds
  }, [currentFolder]);

  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white pl-0 m-0" }}
    >
      {path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            },
          }}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "150px" }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}
