import React, { useState } from "react";
import { Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Input, Select, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaSignOutAlt } from "react-icons/fa";

const Index = () => {
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState("");
  const toast = useToast();

  const handleAddPrompt = () => {
    if (newPrompt.trim() !== "") {
      setPrompts([...prompts, { text: newPrompt, evals: [] }]);
      setNewPrompt("");
    }
  };

  const handleDeletePrompt = (index) => {
    const updatedPrompts = [...prompts];
    updatedPrompts.splice(index, 1);
    setPrompts(updatedPrompts);
  };

  const handleAddEval = (promptIndex, evaluation) => {
    const updatedPrompts = [...prompts];
    updatedPrompts[promptIndex].evals.push(evaluation);
    setPrompts(updatedPrompts);
  };

  const handleRemoveEval = (promptIndex, evaluationIndex) => {
    const updatedPrompts = [...prompts];
    updatedPrompts[promptIndex].evals.splice(evaluationIndex, 1);
    setPrompts(updatedPrompts);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        LLM App
      </Heading>

      <Box mb={4}>
        <Input value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} placeholder="Enter a new prompt" mr={2} />
        <Button onClick={handleAddPrompt} colorScheme="blue">
          Add Prompt
        </Button>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Prompt</Th>
            <Th>Evals</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {prompts.map((prompt, index) => (
            <Tr key={index}>
              <Td>{prompt.text}</Td>
              <Td>
                {prompt.evals.map((evaluation, evaluationIndex) => (
                  <Box key={evaluationIndex}>
                    {evaluation} <IconButton icon={<FaTrash />} size="sm" onClick={() => handleRemoveEval(index, evaluationIndex)} />
                  </Box>
                ))}
                <Select placeholder="Select eval" size="sm" onChange={(e) => handleAddEval(index, e.target.value)}>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </Select>
              </Td>
              <Td>
                <IconButton icon={<FaTrash />} onClick={() => handleDeletePrompt(index)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Button leftIcon={<FaSignOutAlt />} colorScheme="red" mt={4} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Index;
