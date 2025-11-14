"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Fragrance } from "@/types/fragrance";

interface AccordWheelProps {
  fragrance: Fragrance;
  width?: number;
  height?: number;
}

export default function AccordWheel({
  fragrance,
  width = 300,
  height = 300,
}: AccordWheelProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Calculate accord distribution from notes
    const accordData = calculateAccords(fragrance);

    if (accordData.length === 0) {
      // Show placeholder if no data
      const svg = d3.select(svgRef.current);
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#9CA3AF")
        .text("No accord data available");
      return;
    }

    const svg = d3.select(svgRef.current);
    const radius = Math.min(width, height) / 2 - 40;
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Color scale
    const color = d3.scaleOrdinal<string>()
      .domain(accordData.map(d => d.name))
      .range([
        "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B",
        "#10B981", "#06B6D4", "#6366F1", "#F43F5E"
      ]);

    // Create pie layout
    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null);

    // Create arc generator
    const arc = d3.arc<any>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    // Create hover arc
    const arcHover = d3.arc<any>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius + 10);

    // Draw arcs
    const arcs = g
      .selectAll(".arc")
      .data(pie(accordData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.name))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arcHover);

        // Show tooltip
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.data.name}</strong><br/>${d.data.value} notes`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc);

        tooltip.style("opacity", 0);
      });

    // Add labels
    arcs
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(d => (d.data.value > 1 ? d.data.name : ""));

    // Create tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px 12px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 1000);

    // Center label
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "#374151")
      .text("Accords");

    // Cleanup
    return () => {
      tooltip.remove();
    };
  }, [fragrance, width, height]);

  return (
    <div className="flex justify-center">
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
}

// Helper function to calculate accords from notes
function calculateAccords(fragrance: Fragrance): Array<{ name: string; value: number }> {
  const accordMap: Record<string, string[]> = {
    Floral: ["rose", "jasmine", "violet", "lily", "iris", "tuberose", "ylang-ylang", "peony", "orchid"],
    Citrus: ["bergamot", "lemon", "orange", "grapefruit", "mandarin", "lime", "citron"],
    Woody: ["sandalwood", "cedar", "oak", "vetiver", "patchouli", "pine", "cypress"],
    Oriental: ["amber", "vanilla", "musk", "incense", "myrrh", "frankincense", "oud"],
    Fresh: ["mint", "lavender", "basil", "eucalyptus", "rosemary", "thyme"],
    Spicy: ["cinnamon", "pepper", "ginger", "cardamom", "nutmeg", "clove", "saffron"],
    Fruity: ["apple", "peach", "pear", "plum", "cherry", "apricot", "strawberry", "raspberry"],
    Gourmand: ["chocolate", "coffee", "caramel", "honey", "tonka", "praline", "cocoa"],
  };

  const allNotes = [
    ...fragrance.topNotes,
    ...fragrance.middleNotes,
    ...fragrance.baseNotes,
  ].map(n => n.toLowerCase());

  const accordCounts: Record<string, number> = {};

  allNotes.forEach(note => {
    Object.entries(accordMap).forEach(([accord, keywords]) => {
      if (keywords.some(keyword => note.includes(keyword))) {
        accordCounts[accord] = (accordCounts[accord] || 0) + 1;
      }
    });
  });

  return Object.entries(accordCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
