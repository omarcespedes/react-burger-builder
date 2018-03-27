import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import './BurgerIngredient.css';

const ingredientSource = {
	canDrag(props) {
		return !props.disableDragging
	},

	beginDrag(props) {
		return {
			index: props.index,
			type: props.type,
			price: props.price
		}
	},

	endDrag(props, monitor) {
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			if(dropResult.name === 'emptyZone') {
				props.addIngredient(monitor.getItem());
			}
		} else {
			props.removeIngredient(monitor.getItem().index);
		}
	}
}

const ingredientTarget = {
	hover(props, monitor, component) {
		const itemDrag = monitor.getItem();
		const dragIndex = itemDrag.index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Don't allow to move above or down the breads
		if (component.props.type === 'breadBottom' || component.props.type === 'breadTop') {
			return
		}

		//in case it is added send new props config
		const config = (({ index, type, removeIngredient, price }) => ({ index, type, removeIngredient, price }))(itemDrag);

		// Time to actually perform the action
		props.moveIngredient && props.moveIngredient(dragIndex, hoverIndex, config);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},
}

export default (draggable) => {
	// eslint-disable-next-line
	let BurgerIngredient = (props) => {
		let ingredientClass = '';
		switch (props.type) {
			case 'ham':
				ingredientClass = 'ham';
				break;
			case 'lettuce':
				ingredientClass = 'lettuce';
				break;
			case 'chesse':
				ingredientClass = 'chesse';
				break;
			case 'breadTop':
				ingredientClass = 'bread-top';
				break;
			case 'meat':
				ingredientClass = 'meat';
				break;
			case 'breadBottom':
				ingredientClass = 'bread-bottom';
				break;
			default:
				ingredientClass = '';
		}
	
		const {
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = props
		const opacity = isDragging ? 0 : 1
		const content = <div style={{ ...opacity }} className={'ingredient ' + ingredientClass}></div>;

		if( draggable ) {
			return connectDragSource(
				connectDropTarget(content)
			);
		} else {
			return content;
		}		
	}

	if (draggable) {
		BurgerIngredient = DragSource('card', ingredientSource, (connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging(),
		}))(BurgerIngredient);
		
		BurgerIngredient = DropTarget('card', ingredientTarget, connect => ({
			connectDropTarget: connect.dropTarget(),
		}))(BurgerIngredient);
	}

	return BurgerIngredient;
};