import { Modal, Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useMemo } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface GraphicsModalProps {
  show: boolean;
  onClose?: () => void;
  users: User[];
  posts: Post[];
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

const GraphicsModal: React.FC<GraphicsModalProps> = ({
  show,
  onClose,
  users,
  posts,
}) => {
  const postCount = useMemo(() => {
    const contador = users.reduce((acc, user) => {
      acc[user.name] = posts.filter((post) => post.userId === user.id).length;
      return acc;
    }, {} as Record<string, number>);
    return contador;
  }, [users, posts]);
  const userNames = users.map((user) => user.name);

  const data = useMemo(() => {
    return userNames.map((name) => postCount[name] || 0);
  }, [postCount, userNames]);

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="modal-graphics"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 2,
          }}
        >
          Informe sobre publicaciones de usuarios
        </Typography>

        <BarChart
          series={[{ data, label: "Cantidad de posteos", color: "#7B183E" }]}
          height={290}
          xAxis={[{ data: userNames, scaleType: "band" }]}
          margin={{ top: 60, bottom: 30, left: 20, right: 10 }}
          sx={{
            color: "#7B183E",
          }}
        />
      </Box>
    </Modal>
  );
};

export default GraphicsModal;
