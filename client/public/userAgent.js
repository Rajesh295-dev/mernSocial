


console.log("Code is executed."); // Add this to check if the code is reached
if (navigator.userAgentData) {
    const userAgentData = navigator.userAgentData;
    console.log(userAgentData); // Add this to inspect the retrieved data
    const browserBrand = userAgentData.brands[0].brand;
    const browserVersion = userAgentData.brands[0].version;

    // Extract platform information
    const platform = userAgentData.platform;

    console.log(`Browser Brand: ${browserBrand}`);
    console.log(`Browser Version: ${browserVersion}`);
    console.log(`Platform: ${platform}`);
    // Use the retrieved information as needed
} else {
    console.log("navigator.userAgentData is not supported."); // Check if it falls into the 'else' block
}