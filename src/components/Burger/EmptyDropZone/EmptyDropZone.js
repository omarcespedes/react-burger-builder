import React from 'react';
import { DropTarget } from 'react-dnd';

const styles = {
    width: '80%',
    height: '30px',
    textAlign: 'center',
    padding: '15px',
    border: '1px solid black'
}

const ingredientTarget = {
    drop() {
        return { name: 'emptyZone' }
    }
}

let emptyDropZone = (props) => {
    const { isOver, connectDropTarget } = props;

    return connectDropTarget(
        <div style={styles}>
            { isOver? '' : 'Start Dropping here'}
        </div>
    )
}

emptyDropZone = DropTarget('card', ingredientTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
}))(emptyDropZone);

export default emptyDropZone;