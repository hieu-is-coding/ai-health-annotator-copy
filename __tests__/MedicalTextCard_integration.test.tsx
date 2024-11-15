import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MedicalTextCard from "../components/MedicalTextCard";

describe("MedicalTextCard Integration Tests", () => {
  const mockData = {
    text: "Patient presents with severe headache and nausea for the past 3 days.",
    task: "Summarization",
    confidence: 0.92
  };

  it("integrates with Badge and Textarea components correctly", () => {
    render(
      <MedicalTextCard
        text={mockData.text}
        task={mockData.task}
        confidence={mockData.confidence}
      />
    );

    expect(screen.getByText("Sample Text")).toBeInTheDocument();

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("text-gray-500", "bg-gray-100");
    expect(textarea).toHaveValue(mockData.text);

    const taskBadge = screen.getByText(mockData.task);
    expect(taskBadge).toHaveClass("bg-primary-100", "text-primary-800");

    const confidenceBadge = screen.getByText(`Confidence: ${mockData.confidence.toFixed(2)}`);
    expect(confidenceBadge).toHaveClass("bg-secondary-100", "text-secondary-800");
  });

  it("maintains layout structure when content changes", () => {
    const { rerender } = render(
      <MedicalTextCard
        text={mockData.text}
        task={mockData.task}
        confidence={mockData.confidence}
      />
    );

    // Test with longer content
    const longData = {
      text: "Very long medical text that spans multiple lines...\n".repeat(5),
      task: "Long Task Name With Multiple Words",
      confidence: 0.99999
    };

    rerender(
      <MedicalTextCard
        text={longData.text}
        task={longData.task}
        confidence={longData.confidence}
      />
    );

    // Verify layout remains intact
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText(longData.task)).toBeInTheDocument();
    expect(screen.getByText(`Confidence: ${longData.confidence.toFixed(2)}`)).toBeInTheDocument();
  });
}); 