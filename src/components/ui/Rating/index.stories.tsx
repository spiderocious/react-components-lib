import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Rating, RatingHalf, RatingInteractive, RatingReadOnly } from ".";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    precision: {
      control: { type: "select" },
      options: [0.5, 1],
    },
    readOnly: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    showTooltip: {
      control: { type: "boolean" },
    },
    allowClear: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    readOnly: true,
  },
};

export const Interactive: Story = {
  args: {
    value: 0,
    max: 5,
    readOnly: false,
    onChange: (value) => console.log("Rating changed:", value),
  },
};

export const HalfStars: Story = {
  args: {
    value: 2.5,
    max: 5,
    precision: 0.5,
    readOnly: true,
  },
};

export const WithTooltip: Story = {
  args: {
    value: 0,
    max: 5,
    readOnly: false,
    showTooltip: true,
    onChange: (value) => console.log("Rating changed:", value),
  },
};

// Recreating Image 8 layout
export const ImageLayout: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 max-w-lg">
      {/* Left column - 3 star ratings */}
      <div className="space-y-6">
        <Rating value={3} max={3} readOnly />
        <Rating value={2} max={3} readOnly />
        <Rating value={1} max={3} readOnly />
        <Rating value={0} max={3} readOnly />
      </div>

      {/* Right column - 5 star ratings */}
      <div className="space-y-6">
        <Rating value={5} max={5} readOnly />
        <Rating value={4} max={5} readOnly />
        <Rating value={3} max={5} readOnly />
        <Rating value={2} max={5} readOnly />
        <Rating value={1} max={5} readOnly />
        <Rating value={0} max={5} readOnly />
      </div>
    </div>
  ),
};

// Size variations
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Rating value={3} size="xs" readOnly />
        <span className="text-xs text-gray-600">Extra Small</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating value={3} size="sm" readOnly />
        <span className="text-sm text-gray-600">Small</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating value={3} size="md" readOnly />
        <span className="text-sm text-gray-600">Medium</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating value={3} size="lg" readOnly />
        <span className="text-sm text-gray-600">Large</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating value={3} size="xl" readOnly />
        <span className="text-sm text-gray-600">Extra Large</span>
      </div>
    </div>
  ),
};

// Vertical orientation
export const VerticalRating: Story = {
  render: () => (
    <div className="flex gap-8 h-40">
      <div className="flex flex-col items-center">
        <Rating value={3} orientation="vertical" readOnly />
        <span className="text-xs text-gray-600 mt-2">Product A</span>
      </div>
      <div className="flex flex-col items-center">
        <Rating value={4} orientation="vertical" readOnly />
        <span className="text-xs text-gray-600 mt-2">Product B</span>
      </div>
      <div className="flex flex-col items-center">
        <Rating value={2} orientation="vertical" readOnly />
        <span className="text-xs text-gray-600 mt-2">Product C</span>
      </div>
    </div>
  ),
};

// Interactive examples
export const InteractiveExamples: Story = {
  render: () => {
    const [rating1, setRating1] = React.useState(0);
    const [rating2, setRating2] = React.useState(3);
    const [rating3, setRating3] = React.useState(2.5);

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-sm font-medium mb-2">Rate this product</h3>
          <Rating value={rating1} onChange={setRating1 as any} showTooltip />
          <p className="text-xs text-gray-600 mt-1">
            Current rating: {rating1}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Service quality</h3>
          <Rating value={rating2} onChange={setRating2 as any} allowClear />
          <p className="text-xs text-gray-600 mt-1">Rating: {rating2}/5</p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Half-star precision</h3>
          <Rating
            value={rating3}
            onChange={setRating3 as any}
            precision={0.5}
            showTooltip
          />
          <p className="text-xs text-gray-600 mt-1">Rating: {rating3}/5</p>
        </div>
      </div>
    );
  },
};

// Different max values
export const DifferentMaxValues: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center gap-4">
        <Rating value={3} max={3} readOnly />
        <span className="text-sm text-gray-600">3 stars max</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating value={4} max={5} readOnly />
        <span className="text-sm text-gray-600">5 stars max</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating value={6} max={10} readOnly />
        <span className="text-sm text-gray-600">10 stars max</span>
      </div>
    </div>
  ),
};

// Custom icons
export const CustomIcons: Story = {
  render: () => {
    const HeartIcon = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );

    const ThumbIcon = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    );

    const [heartRating, setHeartRating] = React.useState(3);
    const [thumbRating, setThumbRating] = React.useState(2);

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-sm font-medium mb-2">Heart Rating</h3>
          <Rating
            value={heartRating}
            onChange={setHeartRating as any}
            icon={<HeartIcon />}
            className="text-red-500"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Thumbs Up Rating</h3>
          <Rating
            value={thumbRating}
            onChange={setThumbRating as any}
            icon={<ThumbIcon />}
            className="text-blue-500"
          />
        </div>
      </div>
    );
  },
};

// Disabled state
export const DisabledRating: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Disabled</h3>
        <Rating value={3} disabled />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Read Only</h3>
        <Rating value={4} readOnly />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Interactive</h3>
        <Rating value={2} onChange={(value) => console.log(value)} />
      </div>
    </div>
  ),
};

// Predefined variants
export const PredefinedVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Read Only</h3>
        <RatingReadOnly value={4} />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Interactive</h3>
        <RatingInteractive
          value={0}
          onChange={(value) => console.log("Interactive rating:", value)}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Half Stars</h3>
        <RatingHalf value={3.5} readOnly />
      </div>
    </div>
  ),
};

// Product rating examples
export const ProductRatings: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Product A</h4>
          <p className="text-sm text-gray-600">Great quality</p>
        </div>
        <Rating value={5} readOnly size="sm" />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Product B</h4>
          <p className="text-sm text-gray-600">Good value</p>
        </div>
        <Rating value={4} readOnly size="sm" />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Product C</h4>
          <p className="text-sm text-gray-600">Average quality</p>
        </div>
        <Rating value={3} readOnly size="sm" />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Product D</h4>
          <p className="text-sm text-gray-600">Below expectations</p>
        </div>
        <Rating value={2} readOnly size="sm" />
      </div>
    </div>
  ),
};

// Review form example
export const ReviewForm: Story = {
  render: () => {
    const [ratings, setRatings] = React.useState({
      overall: 0,
      quality: 0,
      value: 0,
      service: 0,
    });

    const updateRating = (category: keyof typeof ratings, value: any) => {
      setRatings((prev) => ({ ...prev, [category]: value }));
    };

    return (
      <div className="max-w-md p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Rate Your Experience</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Rating</span>
            <Rating
              value={ratings.overall}
              onChange={(value) => updateRating("overall", value)}
              size="lg"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Product Quality</span>
            <Rating
              value={ratings.quality}
              onChange={(value) => updateRating("quality", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Value for Money</span>
            <Rating
              value={ratings.value}
              onChange={(value) => updateRating("value", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Customer Service</span>
            <Rating
              value={ratings.service}
              onChange={(value) => updateRating("service", value)}
            />
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded">
          <h4 className="text-sm font-medium mb-2">Your Ratings:</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Overall: {ratings.overall}/5</div>
            <div>Quality: {ratings.quality}/5</div>
            <div>Value: {ratings.value}/5</div>
            <div>Service: {ratings.service}/5</div>
          </div>
        </div>
      </div>
    );
  },
};

// Star distribution
export const StarDistribution: Story = {
  render: () => (
    <div className="max-w-md">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-3">
            <span className="text-sm w-6">{stars}</span>
            <Rating value={stars} max={5} readOnly size="xs" />
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${Math.random() * 80 + 10}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 w-8">
              {Math.floor(Math.random() * 50 + 5)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Rating value={4.2} precision={0.5} readOnly />
          <span className="text-sm font-medium">4.2 out of 5</span>
          <span className="text-xs text-gray-600">(123 reviews)</span>
        </div>
      </div>
    </div>
  ),
};
