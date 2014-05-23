
module PointerLock where

{-| Library for locking the pointer

@docs requestPointerLock, exitPointerLock

@docs movement, dx, dy

@docs isLocked

-}

import Signal (Signal)
import Native.PointerLock

{-| Lock the pointer. -}
requestPointerLock : () 
requestPointerLock = Native.PointerLock.requestPointerLock

{-| Exit pointer lock. -}
exitPointerLock : ()
exitPointerLock = Native.PointerLock.exitPointerLock

{-| The current mouse movement. -}
movement : Signal (Int, Int)
movement = Native.PointerLock.movement

{-| The current x-delta of the mouse -}
dx : Signal Int
dx = Native.PointerLock.dx

{-| The current y-delta of the mouse -}
dy : Signal Int
dy = Native.PointerLock.dy

{-| The current state of pointer lock.
True when Pointer Lock is active, false otherwise. -}
isLocked : Signal Bool
isLocked = Native.PointerLock.isLocked
