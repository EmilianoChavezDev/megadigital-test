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
      <Box className="graphics-container">
        <Typography id="modal-title" variant="h6" component="h2">
          Reporte sobre publicaciones de usuarios
        </Typography>

        <BarChart
          series={[{ data, label: "Cantidad de posteos", color: "#7B183E" }]}
          height={260}
          xAxis={[{ data: userNames, scaleType: "band" }]}
          margin={{ top: 60, bottom: 20, left: 10, right: 5 }}
          sx={{
            color: "#7B183E",
          }}
        />
      </Box>
    </Modal>
  );
};

export default GraphicsModal;
