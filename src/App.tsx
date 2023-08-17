import React from "react";
import logo from "./logo.svg";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, Button, Spinner } from "@chakra-ui/react";
import "./App.css";

const queryClient = new QueryClient();

async function getInfo() {
  const response = await fetch("http://www.boredapi.com/api/activity/");
  return response.json();
}

function BoredCard() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["info"],
    queryFn: getInfo,
  });
  console.log(data?.activity);
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  else
    return (
      <div className="container">
        <Card>
          <CardHeader>Bored?</CardHeader>
          <CardBody>{data.activity}</CardBody>
          <Button colorScheme="blue" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </Card>
      </div>
    );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BoredCard />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
