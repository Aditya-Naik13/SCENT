"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface NotePyramidProps {
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  width?: number;
  height?: number;
}

export default function NotePyramid({
  topNotes,
  middleNotes,
  baseNotes,
  width = 400,
  height = 300,
}: NotePyramidProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define pyramid layers
    const layers = [
      { name: "Top", notes: topNotes, color: "#FEF3C7", textColor: "#92400E" },
      { name: "Middle", notes: middleNotes, color: "#FBCFE8", textColor: "#831843" },
      { name: "Base", notes: baseNotes, color: "#DDD6FE", textColor: "#5B21B6" },
    ];

    const layerHeight = innerHeight / 3;
    const pyramidTop = innerWidth / 2;

    layers.forEach((layer, i) => {
      const y = i * layerHeight;
      const topWidth = pyramidTop - (i * pyramidTop) / 3;
      const bottomWidth = pyramidTop - ((i + 1) * pyramidTop) / 3;
      const centerX = innerWidth / 2;

      // Draw trapezoid
      const points = [
        [centerX - topWidth, y],
        [centerX + topWidth, y],
        [centerX + bottomWidth, y + layerHeight],
        [centerX - bottomWidth, y + layerHeight],
      ];

      g.append("path")
        .attr("d", `M${points.map(p => p.join(",")).join("L")}Z`)
        .attr("fill", layer.color)
        .attr("stroke", "#9CA3AF")
        .attr("stroke-width", 2)
        .attr("opacity", 0.9);

      // Add layer label
      g.append("text")
        .attr("x", centerX)
        .attr("y", y + 20)
        .attr("text-anchor", "middle")
        .attr("fill", layer.textColor)
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        .text(layer.name);

      // Add notes
      if (layer.notes.length > 0) {
        const notesText = layer.notes.slice(0, 3).join(", ");
        const moreText = layer.notes.length > 3 ? ` +${layer.notes.length - 3}` : "";

        g.append("text")
          .attr("x", centerX)
          .attr("y", y + layerHeight / 2 + 10)
          .attr("text-anchor", "middle")
          .attr("fill", layer.textColor)
          .attr("font-size", "11px")
          .text(notesText + moreText)
          .call(wrap, bottomWidth * 2 - 20);
      }
    });

    // Text wrapping function
    function wrap(text: any, width: number) {
      text.each(function(this: SVGTextElement) {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line: string[] = [];
        let lineNumber = 0;
        const lineHeight = 1.1;
        const y = text.attr("y");
        const dy = 0;
        let tspan = text
          .text(null)
          .append("tspan")
          .attr("x", text.attr("x"))
          .attr("y", y)
          .attr("dy", dy + "em");

        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node()!.getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", text.attr("x"))
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }
  }, [topNotes, middleNotes, baseNotes, width, height]);

  return (
    <div className="flex justify-center">
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
}
