import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  ListItemButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface BookmarkListProps {
  bookmarks: { id: string; state: any }[];
  deleteBookmark: (id: string) => void;
  loadBookmark: (state: any) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  bookmarks,
  deleteBookmark,
  loadBookmark,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 16,
        bottom: 16,
        backgroundColor: "#242424",
        padding: "0.8rem",
        borderRadius: "0.5rem",
        zIndex: 50,
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        style={{ color: "#FFF9BF", marginBottom: "0.5rem" }}
      >
        Bookmarks
      </Typography>
      <List>
        {bookmarks.map((bookmark) => (
          <ListItem
            key={bookmark.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteBookmark(bookmark.id)}
              >
                <DeleteIcon sx={{ color: "#FFF9BF" }} />
              </IconButton>
            }
          >
            <ListItemButton dense onClick={() => loadBookmark(bookmark.state)}>
              <ListItemText primary={`View - ${bookmark.id}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BookmarkList;
