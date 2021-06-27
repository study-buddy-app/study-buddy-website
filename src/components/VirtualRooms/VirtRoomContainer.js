
import SocketApp from './SocketApp'
import {ContextProvider} from './SocketContext'

export default function VirtRoomContainer() {
	return (
<ContextProvider>
            <SocketApp />
</ContextProvider>
    )
}