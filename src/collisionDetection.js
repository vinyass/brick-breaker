export function detectCollision(ball, gameObject) {
  //detect collision on pedal
  const bottomOfBall = ball.position.y + ball.size,
    topOfBall = ball.position.y,
    topOfObject = gameObject.position.y,
    leftSideOfObject = gameObject.position.x,
    rightSideOfObject = gameObject.position.x + gameObject.width,
    bottomOfObject = gameObject.position.y + gameObject.height;
  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject
  ) {
    return true;
  }
  return false;
}
