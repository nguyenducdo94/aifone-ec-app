import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
   root: {

   },
   content: {
      width: '50%',
   },
   rootShift: {
      marginLeft: 240
   },
   container: {
      display: 'flex',
      padding: 20,
      alignContent: 'center',
      justifyContent: 'center',
   },
   profile_container: {
      padding: 20,
      display: 'flex',
      alignItems: 'center',
   },

   img_container: {
      position: 'relative',
      marginRight: 20,
      "& .img_container_overlay": {
         display: "none"
      },
      "&:hover .img_container_overlay": {
         display: "block",
         opacity: 0.1
      }
   },
   img_container_img: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      border: '1px solid var(--color - 4)',
   },
   img_container_overlay: {
      position: 'fixed',
      marginTop: -60,
      marginLeft: 35,
   },

   text_container: {
      flexGrow: 1
   },
   text_container_profile_name: {
      textAlign: 'left'
   }
}));