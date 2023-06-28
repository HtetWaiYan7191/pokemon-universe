const showReaction = (reactionNumbers, reactionCounters) => {
    reactionNumbers.forEach((reactionNumber) => {
        reactionCounters.forEach((reactionCount) => {
            if(reactionNumber.item_id === reactionCount.id) {
                reactionCount.textContent = `${reactionNumber.likes} likes`
            }
        })
    });
}

export default showReaction;