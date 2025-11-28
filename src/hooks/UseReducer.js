export function framesReducer(prevFrames, action) {

  switch (action.type) {
    case 'UPDATE_FRAME_DATA':
      return prevFrames.map(frame => {
        // Find the specific frame by frameName
        if (frame.frameName !== action.payload.sportsSelected) {
          return frame; // Return unchanged frame
        }

        // Return a *new* frame object with the updated data
        return {
          ...frame,
          frameData: {
            ...frame.frameData, // Shallow copy of existing frameData
            [action.payload.categorySelected]: action.payload.data // Update the specific category
          }
        };
      });

    // Add other actions if needed (e.g., 'INITIALIZE_FRAMES')

    default:
      return prevFrames;
  }
}