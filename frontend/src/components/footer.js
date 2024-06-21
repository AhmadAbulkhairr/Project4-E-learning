import React from 'react'
import { Typography } from '@mui/material';
import { Margin } from '@mui/icons-material';
const Footer = () => {
  const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
};
  return (
       <div style={style} >
        <footer >
          <Typography variant="body2" color="textSecondary" align="center">
            © 2024 Learno. All rights reserved.
          </Typography>
        </footer>
        </div>
  )
}

export default Footer