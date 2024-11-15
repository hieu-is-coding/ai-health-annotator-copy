import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import MedicalTextCard from "../components/MedicalTextCard";

describe("MedicalTextCard Unit Tests", () => {
  const sampleText = "Sample medical text";
  const sampleTask = "Sample Task";
  const sampleConfidence = 0.75;

  beforeEach(() => {
    render(
      <MedicalTextCard
        text={sampleText}
        task={sampleTask}
        confidence={sampleConfidence}
      />
    );
  });

  it("given text is visible", () => {
    const textarea = screen.getByDisplayValue(sampleText);
    expect(textarea).toBeInTheDocument();
  });

  it("task badge is visible", () => {
    const taskBadge = screen.getByText(sampleTask);
    expect(taskBadge).toBeInTheDocument();
  });

  it("confidence level is visible", () => {
    const confidenceBadge = screen.getByText(
      `Confidence: ${sampleConfidence.toFixed(2)}`
    );
    expect(confidenceBadge).toBeInTheDocument();
  });

  it("textarea is read-only", () => {
    const textarea = screen.getByDisplayValue(sampleText);
    expect(textarea).toHaveAttribute('readonly');
  });

  it("handles empty text gracefully", () => {
    cleanup();
    
    render(
      <MedicalTextCard
        text=""
        task={sampleTask}
        confidence={sampleConfidence}
      />
    );
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('');
    expect(textarea).toBeInTheDocument();
  });
});
