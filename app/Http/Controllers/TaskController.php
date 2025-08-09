<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TasKResource;
use App\Model\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new TaskCollection(
            auth()->user()->tasks()
                ->where('archived', false)
                ->latest()
                ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */ public function store(TaskRequest $request)
    {
        $task = auth()->user()->tasks()->create($request->validated());
        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $this->authorize('view', $task);
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);
        $task->update($request->validated());
        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response()->noContent();
    }

    public function complete(Task $task)
    {
        $this->authorize('update', $task);
        $task->update([
            'completed' => true,
            'completed_at' => now()
        ]);
        return new TaskResource($task);
    }

    public function archive(Task $task)
    {
        $this->authorize('update', $task);
        $task->update(['archived' => true]);
        return new TaskResource($task);
    }
}
