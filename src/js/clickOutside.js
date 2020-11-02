export default function clickOutside(node, params) {
    const isNestedChild = (parent, child) => {
        let currentNode = child;

        while (currentNode !== null) {
            if (currentNode.parentNode === parent) {
                return true;
            } else {
                currentNode = currentNode.parentNode;
            }
        }

        return false;
    }

    const handleClick = event => {  
        const { target } = event;

        if (!node.isSameNode(target) && !isNestedChild(node, target) && !params.exclusions.includes(target.id)) {
            params.callback();
        }
    }

    document.addEventListener("click", handleClick);

    return {
        destroy() {
            document.removeEventListener("click", handleClick);
        }
    }
}