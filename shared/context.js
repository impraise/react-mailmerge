class MockContext {
  getRemainingTimeInMillis() {
    // return a random integer between 0 and 5000
    return Math.floor(Math.random() * 5000);
  }
}

export default MockContext;
