<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Affiche la liste des tâches.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::with('user')->get();
        return response()->json($tasks);
    }

    /**
     * Crée une nouvelle tâche.
     *
     * @param \App\Http\Requests\TaskRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(TaskRequest $request)
    {

        $task = Task::create($request->validated() + ['user_id' => $request->input('user_id')]);
        return response()->json($task, 201);
    }

    /**
     * Affiche les détails d'une tâche.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return response()->json($task);
    }

    /**
     * Met à jour une tâche existante.
     *
     * @param \App\Http\Requests\TaskRequest $request
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function update(TaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return response()->json($task);
    }

    /**
     * Marque une tâche comme complétée.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function complete(Task $task)
    {
        $task->update([
            'completed' => true,
            'completed_at' => now(),
        ]);
        return response()->json($task);
    }

    /**
     * Archive une tâche.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function archive(Task $task)
    {
        $task->update(['archived' => true]);
        return response()->json($task);
    }

    /**
     * Supprime une tâche.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
